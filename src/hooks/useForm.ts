import { type ChangeEvent, useState } from "react";

export function useForm<T>(initialData = {} as T) {
  const [data, setData] = useState<T>(() => initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (submitFunction: (data: T) => Promise<void>) => {
    setIsSubmitting(true);
    submitFunction(data).finally(() => setIsSubmitting(false));
  };

  const resetForm = () => {
    setData(initialData);
  };

  return { data, handleChange, handleSubmit, isSubmitting, resetForm };
}
