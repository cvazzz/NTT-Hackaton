
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Calendar, 
  CreditCard, 
  User, 
  CheckCircle
} from "lucide-react";

// Form schema
const formSchema = z.object({
  // Step 1: Financiamiento
  amount: z.string().min(1, "El monto es requerido"),
  term: z.string().min(1, "El plazo es requerido"),
  
  // Step 2: Información de la Startup
  purpose: z.string().min(1, "El propósito es requerido"),
  category: z.string().min(1, "La categoría es requerida"),
  
  // Step 3: Plan de Devolución
  paymentFrequency: z.string().min(1, "La frecuencia de pago es requerida"),
  proposedInterestRate: z.string().min(1, "La tasa de interés propuesta es requerida"),
  
  // Step 4: Pitch de la Startup
  story: z.string().min(10, "Por favor proporciona más detalles sobre tu startup y el uso del financiamiento"),
  
  // Step 5: Información de Respaldo
  income: z.string().min(1, "La información de ingresos es requerida"),
  collateral: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const calculateMonthlyPayment = (amount: number, interestRate: number, months: number) => {
  const monthlyRate = interestRate / 100 / 12;
  const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  return payment;
};

export function LoanRequestForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      term: "6",
      purpose: "",
      category: "",
      paymentFrequency: "monthly",
      proposedInterestRate: "5",
      story: "",
      income: "",
      collateral: "",
      additionalInfo: ""
    },
    mode: "onChange"
  });

  const { watch } = form;
  const amount = parseFloat(watch("amount") || "0");
  const term = parseInt(watch("term") || "6");
  const interestRate = parseFloat(watch("proposedInterestRate") || "5");

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = (values: FormValues) => {
    toast.success("Loan request submitted successfully!");
    console.log("Form submitted with values:", values);
    navigate("/dashboard");
  };

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Calculate monthly payment
  const monthlyPayment = calculateMonthlyPayment(amount, interestRate, term);
  const totalRepayment = monthlyPayment * term;
  const totalInterest = totalRepayment - amount;

  const renderStepIndicator = () => {
    return (
      <div className="w-full mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 form-step-wizard">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <CreditCard className="h-5 w-5" />
              <h3>Loan Details</h3>
            </div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount (NEAR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount of NEAR tokens you wish to borrow
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term (months)</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how long you need to repay the loan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 form-step-wizard">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <FileText className="h-5 w-5" />
              <h3>Loan Purpose</h3>
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="ai">Inteligencia Artificial</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="biotech">Biotech</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecciona la categoría que mejor describe tu startup
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej., Expansión de mercado, Desarrollo de producto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Proporciona un título breve que describa el propósito del financiamiento para tu startup
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 form-step-wizard">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Calendar className="h-5 w-5" />
              <h3>Repayment Plan</h3>
            </div>
            <FormField
              control={form.control}
              name="paymentFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Frequency</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how often you want to make repayments
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proposedInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Interest Rate (% APR)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="20" {...field} />
                  </FormControl>
                  <FormDescription>
                    Suggest an interest rate for your loan (typical range: 5-15%)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Calculator */}
            {amount > 0 && (
              <Card className="p-4 bg-muted/50">
                <h4 className="font-medium mb-2">Payment Calculator</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Estimated Monthly Payment:</span>
                    <span className="font-medium">{monthlyPayment.toFixed(2)} NEAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Repayment:</span>
                    <span className="font-medium">{totalRepayment.toFixed(2)} NEAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest:</span>
                    <span className="font-medium">{totalInterest.toFixed(2)} NEAR</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 form-step-wizard">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <User className="h-5 w-5" />
              <h3>Your Story</h3>
            </div>
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Loan Story</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share why you need this loan and how it will help you..." 
                      className="min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Tell potential lenders about yourself and why this loan matters to you.
                    A compelling story increases your chances of getting funded.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 form-step-wizard">
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <CheckCircle className="h-5 w-5" />
              <h3>Supporting Information</h3>
            </div>
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Income Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly income in NEAR or USD" {...field} />
                  </FormControl>
                  <FormDescription>
                    This helps lenders assess your ability to repay
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collateral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collateral (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Any assets you can offer as collateral" {...field} />
                  </FormControl>
                  <FormDescription>
                    Listing collateral can improve your chances and lower interest rates
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any other information that might help your loan request" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Create Loan Request</h2>
        <p className="text-muted-foreground">
          Complete each step to create your loan request. All information will be visible to potential lenders.
        </p>
      </div>

      {renderStepIndicator()}

      <Tabs value={`step-${currentStep}`} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="step-1" className="text-xs" disabled>Loan Details</TabsTrigger>
          <TabsTrigger value="step-2" className="text-xs" disabled>Purpose</TabsTrigger>
          <TabsTrigger value="step-3" className="text-xs" disabled>Repayment Plan</TabsTrigger>
          <TabsTrigger value="step-4" className="text-xs" disabled>Your Story</TabsTrigger>
          <TabsTrigger value="step-5" className="text-xs" disabled>Supporting Info</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button type="button" className="ml-auto" onClick={nextStep}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Submit Loan Request
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
