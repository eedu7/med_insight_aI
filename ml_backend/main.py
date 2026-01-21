from io import BytesIO

import torch
from fastapi import FastAPI, File, HTTPException, Query, UploadFile, status
from PIL import Image
from transformers import (
    AutoImageProcessor,
    AutoModelForCausalLM,
    AutoModelForImageClassification,
    AutoTokenizer,
    GPT2LMHeadModel,
    GPT2Tokenizer,
)

app = FastAPI(title="Cancer Detection APIs")

TEXT_MODELS = {
    "openmed-afm": {
        "model_id": "openmed-community/AFM-4.5B-OpenMed",
        "tokenizer": None,
        "model": None,
        "type": "chat-template",
    },
    "medical-gpt2": {
        "model_id": "jianghc/medical_chatbot",
        "tokenizer": None,
        "model": None,
        "type": "custom-prompt",
    },
}


# Model 1: Skin Cancer
SKIN_CANCER_MODEL = "Anwarkh1/Skin_Cancer-Image_Classification"
skin_processor = AutoImageProcessor.from_pretrained(SKIN_CANCER_MODEL)
skin_model = AutoModelForImageClassification.from_pretrained(SKIN_CANCER_MODEL)
skin_model.eval()

# Model 2: Colon & Lung Cancer
COLON_LUNG_MODEL = "DunnBC22/vit-base-patch16-224-in21k_lung_and_colon_cancer"
colon_lung_processor = AutoImageProcessor.from_pretrained(COLON_LUNG_MODEL)
colon_lung_model = AutoModelForImageClassification.from_pretrained(COLON_LUNG_MODEL)
colon_lung_model.eval()


def load_text_models():
    for key, entry in TEXT_MODELS.items():
        if entry["type"] == "custom-prompt":
            tok = GPT2Tokenizer.from_pretrained(entry["model_id"])
            model = GPT2LMHeadModel.from_pretrained(entry["model_id"])
        else:
            tok = AutoTokenizer.from_pretrained(entry["model_id"], use_fast=True)
            model = AutoModelForCausalLM.from_pretrained(
                str(entry["model_id"]),
                torch_dtype=torch.bfloat16,
                device_map="auto",
            )

        model.eval()
        entry["tokenizer"] = tok
        entry["model"] = model


def build_prompt(model_type: str, tokenizer, user_prompt: str) -> str:
    if model_type == "custom-prompt":
        return f"The conversation between human and AI assistant.\n[|Human|] {user_prompt}\n[|AI|]"

    # chat-template (OpenMed, etc.)
    messages = [
        {
            "role": "system",
            "content": "You are a careful medical assistant. Cite sources and warn this is not medical advice.",
        },
        {"role": "user", "content": user_prompt},
    ]

    return tokenizer.apply_chat_template(messages, add_generation_prompt=True, tokenize=False)


def load_image(file: UploadFile) -> Image.Image:
    try:
        content = file.file.read()
        return Image.open(BytesIO(content)).convert("RGB")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image file: {file.filename}",
        )


def predict_image(model, processor, image: Image.Image, top_k: int = 3):
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=-1)[0]

    # Top-k predictions
    top_probs, top_idxs = torch.topk(probs, k=top_k)

    predictions = []
    for idx, score in zip(top_idxs.tolist(), top_probs.tolist()):
        predictions.append({"label": model.config.id2label[idx], "score": float(score)})

    return predictions


@app.post("/skin-cancer", tags=["Skin Cancer"])
async def detect_skin_cancer(file: UploadFile = File(...)):
    image = load_image(file)
    predictions = predict_image(skin_model, skin_processor, image)
    return {"predictions": predictions}


@app.post("/colon-lung-cancer", tags=["Colon & Lung Cancer"])
async def detect_colon_lung_cancer(file: UploadFile = File(...)):
    image = load_image(file)
    predictions = predict_image(colon_lung_model, colon_lung_processor, image)
    return {"predictions": predictions}


@app.post("/text-generate", tags=["Medical Text Generation"])
async def text_generate(
    prompt: str,
    model_name: str = Query("openmed-afm"),
    stream: bool = Query(False),
    max_new_tokens: int = Query(256),
):
    if model_name not in TEXT_MODELS:
        raise HTTPException(status_code=404, detail="Model not found")

    entry = TEXT_MODELS[model_name]
    tok = entry["tokenizer"]
    model = entry["model"]

    full_prompt = build_prompt(entry["type"], tok, prompt)
