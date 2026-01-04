import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        // Extracting data
        const scanType = formData.get("scanType");
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }

        console.log("Scan Type:", scanType);
        console.log("Number of files:", files.length);

        // Example: Process files (convert to Buffer for external APIs like OpenAI or Gemini)
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            // Send buffer to your AI model or S3 bucket here
            console.log(`Processing file: ${file.name}, size: ${file.size}`);
        }

        return NextResponse.json({ 
            success: true, 
            message: "Images received and processing started",
            details: { count: files.length, type: scanType }
        });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}