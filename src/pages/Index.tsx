
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, TrendingUp, TrendingDown, BarChart3, Settings, List } from "lucide-react";
import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import Dashboard from "@/components/Dashboard";
import TransactionList from "@/components/TransactionList";
import SettingsPage from "@/components/SettingsPage";
import DropdownManager from "@/components/DropdownManager";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowExpenseForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
              <Button
                onClick={() => setShowIncomeForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Add Income
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <TransactionList />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <DropdownManager />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsPage />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
      {showIncomeForm && (
        <IncomeForm onClose={() => setShowIncomeForm(false)} />
      )}
    </div>
  );
};

export default Index;
