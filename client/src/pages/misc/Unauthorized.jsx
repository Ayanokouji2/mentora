import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md border border-gray-200 rounded-xl p-8 max-w-md text-center">
        
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-100 text-red-600">
            <ShieldAlert size={48} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to view this page.
        </p>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full"
            onClick={() => navigate("/")}
          >
            Go to Login
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/profile")}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
