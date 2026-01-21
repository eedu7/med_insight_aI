"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetModels } from '../hooks/use-models';
import { SCANMODELS } from '../models';

interface Props {
  modelType: 'chat' | 'scan';
  value: string;
  onValueChange: (value: string) => void;
  onValueIdChange: (value: string) => void;
}

export const SelectModel = ({ value, modelType, onValueChange, onValueIdChange }: Props) => {
  const { data: models } = useGetModels();

  const handleChange = (modelId: string) => {
    onValueChange(modelId);

    const selectedRow = models?.find((m) => m.model_id === modelId);

    if (selectedRow) {
      onValueIdChange(selectedRow.id);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="max-w-md w-full">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>

      <SelectContent className="max-w-md w-full">

        {
          modelType === "chat" &&
          models
            ?.filter((m) => m.task_type === 'chat')
            .map(({ id, model_id, display_name }) => (
              <SelectItem key={id} value={model_id}>
                {display_name}
              </SelectItem>
            ))}
        {
          modelType === "scan" &&
          SCANMODELS.map(({ id, display_name, model_id }) => (
            <SelectItem key={id} value={model_id}>{display_name}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
};
