"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetModels } from '../hooks/use-models';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  onValudIdChange: (value: string) => void
}
export const SelectModel = ({ value, onValueChange, onValudIdChange }: Props) => {
  const { data: models } = useGetModels();
  const handleChange = (modelId: string) => {
    onValueChange(modelId);

    const selectedRow = models?.find(
      (m) => m.model_id === modelId
    )

    if (selectedRow) {
      onValudIdChange(selectedRow.id)
    }

  }
  return (
    <Select
      value={value}
      onValueChange={handleChange}
    >
      <SelectTrigger className='max-w-md w-full'>
        <SelectValue placeholder="Select a models" />
      </SelectTrigger>
      <SelectContent className='max-w-md w-full'>
        {
          models?.map(({ id, display_name, model_id }) => (
            <SelectItem key={id} value={model_id}>{display_name}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
