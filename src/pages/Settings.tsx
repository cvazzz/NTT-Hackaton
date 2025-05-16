import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/contexts/user-role-context";
import { AlertCircle, Bell, CreditCard, Lock, Save, Shield, User } from "lucide-react";

const Settings = () => {
  const { role } = useUserRole();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Estados para configuraciones de perfil
  const [profileSettings, setProfileSettings] = useState({
    name: "Usuario NEAR",
    email: "usuario@ejemplo.com",
    walletAddress: "usuario.near",
    bio: "Miembro de la comunidad NEAR interesado en finanzas descentralizadas.",
    notifyLoanUpdates: true,
    notifyNewOpportunities: true,
    notifyPaymentReminders: true,
    twoFactorEnabled: false
  });

  // Estados para configuraciones de préstamos (prestatario)
  const [borrowerSettings, setBorrowerSettings] = useState({
    maxInterestRate: 6.5,
    preferredTerm: "medium",
    autoRepayments: true,
    publicProfile: true
  });

  // Estados para configuraciones de inversiones (prestamista)
  const [lenderSettings, setLenderSettings] = useState({
    minInterestRate: 4.0,
    maxRiskLevel: "medium",
    autoInvest: false,
    autoInvestAmount: 50,
    preferredCategories: ["business", "education"],
    diversificationLevel: 70
  });

  // Manejar cambios en configuraciones de perfil
  const handleProfileChange = (field: string, value: any) => {
    setProfileSettings(prev => ({ ...prev, [field]: value }));
  };

  // Manejar cambios en configuraciones de préstamos
  const handleBorrowerChange = (field: string, value: any) => {
    setBorrowerSettings(prev => ({ ...prev, [field]: value }));
  };

  // Manejar cambios en configuraciones de inversiones
  const handleLenderChange = (field: string, value: any) => {
    setLenderSettings(prev => ({ ...prev, [field]: value }));
  };

  // Manejar cambios en categorías preferidas
  const handleCategoryChange = (category: string) => {
    setLenderSettings(prev => {
      const updatedCategories = prev.preferredCategories.includes(category)
        ? prev.preferredCategories.filter(c => c !== category)
        : [...prev.preferredCategories, category];
      return { ...prev, preferredCategories: updatedCategories };
    });
  };

  // Guardar configuraciones
  const handleSaveSettings = () => {
    // En una implementación real, esto enviaría los datos al backend
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Configuración</h2>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" /> Guardar Cambios
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          {role === "borrower" && <TabsTrigger value="borrower">Préstamos</TabsTrigger>}
          {role === "lender" && <TabsTrigger value="lender">Inversiones</TabsTrigger>}
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal y preferencias de notificación.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={profileSettings.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileSettings.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet">Dirección de Wallet</Label>
                <Input
                  id="wallet"
                  value={profileSettings.walletAddress}
                  disabled
                />
                <p className="text-sm text-muted-foreground">La dirección de wallet no se puede cambiar.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  value={profileSettings.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="loan-updates">Actualizaciones de Préstamos</Label>
                  <p className="text-sm text-muted-foreground">Recibe notificaciones sobre cambios en tus préstamos.</p>
                </div>
                <Switch
                  id="loan-updates"
                  checked={profileSettings.notifyLoanUpdates}
                  onCheckedChange={(checked) => handleProfileChange("notifyLoanUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-opportunities">Nuevas Oportunidades</Label>
                  <p className="text-sm text-muted-foreground">Recibe notificaciones sobre nuevas oportunidades de préstamo.</p>
                </div>
                <Switch
                  id="new-opportunities"
                  checked={profileSettings.notifyNewOpportunities}
                  onCheckedChange={(checked) => handleProfileChange("notifyNewOpportunities", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="payment-reminders">Recordatorios de Pago</Label>
                  <p className="text-sm text-muted-foreground">Recibe recordatorios antes de las fechas de pago.</p>
                </div>
                <Switch
                  id="payment-reminders"
                  checked={profileSettings.notifyPaymentReminders}
                  onCheckedChange={(checked) => handleProfileChange("notifyPaymentReminders", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {role === "borrower" && (
          <TabsContent value="borrower" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Préstamo</CardTitle>
                <CardDescription>
                  Configura tus preferencias para solicitudes de préstamo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-interest">Tasa de Interés Máxima</Label>
                    <span className="text-sm font-medium">{borrowerSettings.maxInterestRate}%</span>
                  </div>
                  <Slider
                    id="max-interest"
                    min={1}
                    max={15}
                    step={0.5}
                    value={[borrowerSettings.maxInterestRate]}
                    onValueChange={(value) => handleBorrowerChange("maxInterestRate", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">Establece la tasa de interés máxima que estás dispuesto a pagar.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred-term">Plazo Preferido</Label>
                  <Select
                    value={borrowerSettings.preferredTerm}
                    onValueChange={(value) => handleBorrowerChange("preferredTerm", value)}
                  >
                    <SelectTrigger id="preferred-term">
                      <SelectValue placeholder="Selecciona un plazo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Corto (1-3 meses)</SelectItem>
                      <SelectItem value="medium">Medio (4-12 meses)</SelectItem>
                      <SelectItem value="long">Largo (más de 12 meses)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Establece tu plazo preferido para los préstamos.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-repayments">Pagos Automáticos</Label>
                    <p className="text-sm text-muted-foreground">Habilita los pagos automáticos para tus préstamos.</p>
                  </div>
                  <Switch
                    id="auto-repayments"
                    checked={borrowerSettings.autoRepayments}
                    onCheckedChange={(checked) => handleBorrowerChange("autoRepayments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">Permite que los prestamistas vean tu historial de préstamos.</p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={borrowerSettings.publicProfile}
                    onCheckedChange={(checked) => handleBorrowerChange("publicProfile", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {role === "lender" && (
          <TabsContent value="lender" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Inversión</CardTitle>
                <CardDescription>
                  Configura tus preferencias para oportunidades de inversión.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="min-interest">Tasa de Interés Mínima</Label>
                    <span className="text-sm font-medium">{lenderSettings.minInterestRate}%</span>
                  </div>
                  <Slider
                    id="min-interest"
                    min={1}
                    max={10}
                    step={0.5}
                    value={[lenderSettings.minInterestRate]}
                    onValueChange={(value) => handleLenderChange("minInterestRate", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">Establece la tasa de interés mínima que deseas recibir.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-risk">Nivel de Riesgo Máximo</Label>
                  <Select
                    value={lenderSettings.maxRiskLevel}
                    onValueChange={(value) => handleLenderChange("maxRiskLevel", value)}
                  >
                    <SelectTrigger id="max-risk">
                      <SelectValue placeholder="Selecciona un nivel de riesgo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Bajo</SelectItem>
                      <SelectItem value="medium">Medio</SelectItem>
                      <SelectItem value="high">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Establece el nivel máximo de riesgo que estás dispuesto a asumir.</p>
                </div>

                <div className="space-y-2">
                  <Label>Categorías Preferidas</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-business"
                        checked={lenderSettings.preferredCategories.includes("business")}
                        onCheckedChange={() => handleCategoryChange("business")}
                      />
                      <label
                        htmlFor="category-business"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Negocios
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-education"
                        checked={lenderSettings.preferredCategories.includes("education")}
                        onCheckedChange={() => handleCategoryChange("education")}
                      />
                      <label
                        htmlFor="category-education"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Educación
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-housing"
                        checked={lenderSettings.preferredCategories.includes("housing")}
                        onCheckedChange={() => handleCategoryChange("housing")}
                      />
                      <label
                        htmlFor="category-housing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Vivienda
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-tech"
                        checked={lenderSettings.preferredCategories.includes("tech")}
                        onCheckedChange={() => handleCategoryChange("tech")}
                      />
                      <label
                        htmlFor="category-tech"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Tecnología
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-fintech"
                        checked={lenderSettings.preferredCategories.includes("fintech")}
                        onCheckedChange={() => handleCategoryChange("fintech")}
                      />
                      <label
                        htmlFor="category-fintech"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Fintech
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-saas"
                        checked={lenderSettings.preferredCategories.includes("saas")}
                        onCheckedChange={() => handleCategoryChange("saas")}
                      />
                      <label
                        htmlFor="category-saas"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        SaaS
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="diversification">Nivel de Diversificación</Label>
                    <span className="text-sm font-medium">{lenderSettings.diversificationLevel}%</span>
                  </div>
                  <Slider
                    id="diversification"
                    min={0}
                    max={100}
                    step={5}
                    value={[lenderSettings.diversificationLevel]}
                    onValueChange={(value) => handleLenderChange("diversificationLevel", value[0])}
                  />
                  <p className="text-sm text-muted-foreground">Establece qué tan diversificadas quieres que sean tus inversiones.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-invest">Inversión Automática</Label>
                    <p className="text-sm text-muted-foreground">Invierte automáticamente en préstamos que coincidan con tus criterios.</p>
                  </div>
                  <Switch
                    id="auto-invest"
                    checked={lenderSettings.autoInvest}
                    onCheckedChange={(checked) => handleLenderChange("autoInvest", checked)}
                  />
                </div>

                {lenderSettings.autoInvest && (
                  <div className="space-y-2">
                    <Label htmlFor="auto-invest-amount">Monto de Inversión Automática</Label>
                    <div className="flex items-center">
                      <Input
                        id="auto-invest-amount"
                        type="number"
                        min={10}
                        value={lenderSettings.autoInvestAmount}
                        onChange={(e) => handleLenderChange("autoInvestAmount", parseInt(e.target.value))}
                        className="w-full"
                      />
                      <span className="ml-2">NEAR</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cantidad a invertir automáticamente en cada préstamo que coincida.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>
                Configura las opciones de seguridad para proteger tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">Añade una capa adicional de seguridad a tu cuenta.</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={profileSettings.twoFactorEnabled}
                  onCheckedChange={(checked) => handleProfileChange("twoFactorEnabled", checked)}
                />
              </div>

              {profileSettings.twoFactorEnabled && (
                <div className="rounded-md bg-yellow-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Configuración pendiente</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Para completar la configuración de la autenticación de dos factores, escanea el código QR con tu aplicación de autenticación.</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Configurar Ahora
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" /> Cambiar Contraseña
                </Button>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" /> Revisar Actividad de la Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacidad</CardTitle>
              <CardDescription>
                Controla quién puede ver tu información y actividad.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy-level">Nivel de Privacidad</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger id="privacy-level">
                    <SelectValue placeholder="Selecciona un nivel de privacidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Público - Todos pueden ver mi actividad</SelectItem>
                    <SelectItem value="balanced">Equilibrado - Solo miembros de la comunidad</SelectItem>
                    <SelectItem value="private">Privado - Solo participantes de préstamos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection">Recopilación de Datos</Label>
                  <p className="text-sm text-muted-foreground">Permitir la recopilación de datos para mejorar el servicio.</p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;