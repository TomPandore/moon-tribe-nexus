
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserInfoFormData = {
  name: string;
  email: string;
};

type UserInfoEditProps = {
  currentName?: string;
  currentEmail: string;
  onUpdate: (data: UserInfoFormData) => void;
};

export const UserInfoEdit = ({ currentName, currentEmail, onUpdate }: UserInfoEditProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<UserInfoFormData>({
    defaultValues: {
      name: currentName || '',
      email: currentEmail
    }
  });

  const onSubmit = (data: UserInfoFormData) => {
    onUpdate(data);
    setOpen(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès."
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pseudo</FormLabel>
                <FormControl>
                  <Input placeholder="Votre pseudo" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Votre email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sauvegarder</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
