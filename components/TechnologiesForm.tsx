import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useRef } from "react";

type TechnologiesFormProps = {
  technologies: string[];
  handleInputChange: (field: 'technologies', value: string, index: number) => void;
  addItem: (field: 'technologies') => void;
  removeBulletPoint: (index: number, subIndex: number, field: 'technologies') => void;
};

export default function TechnologiesForm({
  technologies,
  handleInputChange,
  addItem,
  removeBulletPoint
}: TechnologiesFormProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, technologies.length);
  }, [technologies]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addItem('technologies');
    }
  };

  useEffect(() => {
    if (inputRefs.current.length > 0 && technologies.length > 1) {
      const lastInput = inputRefs.current[inputRefs.current.length - 1];
      lastInput?.focus();
    }
  }, [technologies.length]);

  return (
    <div>
      <Label htmlFor="technologies">Technologies and Languages</Label>
      {technologies.map((tech, index) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <Input
            ref={(el) => { inputRefs.current[index] = el; }}
            name={`technologies-${index}`}
            value={tech}
            onChange={(e) => handleInputChange('technologies', e.target.value, index)}
            onKeyDown={handleKeyDown}
            placeholder={`Technology ${index + 1}`}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeBulletPoint(index, 0, 'technologies')}
            disabled={technologies.length === 1}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove technology</span>
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => addItem('technologies')} className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Technology
      </Button>
    </div>
  )
}