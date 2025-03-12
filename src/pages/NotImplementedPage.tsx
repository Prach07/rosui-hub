
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface NotImplementedPageProps {
  title: string;
  description?: string;
}

const NotImplementedPage = ({ 
  title, 
  description = "This page is under development and will be available soon." 
}: NotImplementedPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <Construction className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>
      <Button asChild>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotImplementedPage;
