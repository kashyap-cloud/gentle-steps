import RecoveryCards from "@/components/RecoveryCards";

const Index = () => {
  return (
    <div className="min-h-screen gradient-calm flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Gentle Recovery Tips
        </h1>
        <p className="text-muted-foreground text-sm">
          Small practices that support your OCD journey.
        </p>
      </div>

      {/* Cards */}
      <RecoveryCards />
    </div>
  );
};

export default Index;
