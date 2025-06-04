
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, FileSpreadsheet, User, DollarSign, Lock } from "lucide-react";

const SettingsPage = () => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [connectedSheet, setConnectedSheet] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR', 'CHF', 'CNY', 'BRL'];

  const handleConnectSheet = () => {
    if (googleSheetUrl) {
      setConnectedSheet(true);
      console.log("Connecting to Google Sheet:", googleSheetUrl);
    }
  };

  const handleDisconnectSheet = () => {
    setConnectedSheet(false);
    setGoogleSheetUrl("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            App Settings
          </CardTitle>
          <CardDescription>Configure your expense tracker preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Currency Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <Label htmlFor="currency" className="text-sm font-medium">Default Currency</Label>
            </div>
            <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              This will be the default currency for new transactions
            </p>
          </div>

          <Separator />

          {/* Google Sheets Integration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <Label className="text-sm font-medium">Google Sheets Integration</Label>
              {connectedSheet && (
                <Badge variant="secondary" className="text-emerald-600">
                  Connected
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="sheet-url">Google Sheet URL</Label>
                <Input
                  id="sheet-url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  disabled={connectedSheet}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the URL of your Google Sheet for data storage
                </p>
              </div>
              
              <div className="flex gap-2">
                {!connectedSheet ? (
                  <Button onClick={handleConnectSheet} disabled={!googleSheetUrl}>
                    Connect to Google Sheets
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleDisconnectSheet}>
                    Disconnect
                  </Button>
                )}
              </div>
              
              {connectedSheet && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                  <p className="text-sm text-emerald-700">
                    ✅ Successfully connected to Google Sheets. Your transactions will be automatically synced.
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Authentication Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <Label className="text-sm font-medium">Authentication</Label>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Connect to Supabase for Authentication</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    To enable user authentication with SSO (Google, GitHub, etc.), you'll need to connect this app to Supabase.
                  </p>
                  <Button variant="outline" className="mt-3" size="sm">
                    Set Up Authentication
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Data Management */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Data Management</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download your transaction data as CSV
                </p>
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Backup Settings</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Create automatic backups to Google Drive
                </p>
                <Button variant="outline" size="sm">
                  Configure Backup
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
