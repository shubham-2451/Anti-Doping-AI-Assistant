console.log("Dashboard loaded");
console.log("Token in dashboard:", localStorage.getItem("token"));
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

interface Athlete {
  name: string;
  email: string;
  gender: string;
  sport: string;
  subscription: string;
}

interface HistoryItem {
  id: number;
  text: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) {
          throw new Error("Unauthorized");
        }

        const userData = await userRes.json();
        setAthlete(userData);

        // Fetch search history
        const historyRes = await fetch("http://localhost:8000/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (historyRes.ok) {
  const historyData = await historyRes.json();
  console.log("History response:", historyData);
  setHistory(historyData);
}

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        localStorage.removeItem("token");
        navigate("/auth");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="pt-24 text-center">Loading...</div>;

  if (!athlete) return <div className="pt-24 text-center">No data found</div>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto glass-card p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-6 gradient-text">
            Athlete Dashboard
          </h1>

          {/* Athlete Info */}
          <div className="space-y-3 mb-8">
            <p><strong>Name:</strong> {athlete.name}</p>
            <p><strong>Email:</strong> {athlete.email}</p>
            <p><strong>Gender:</strong> {athlete.gender}</p>
            <p><strong>Sport:</strong> {athlete.sport}</p>
            <p>
              <strong>Subscription:</strong>{" "}
              <span className="text-red-500">{athlete.subscription}</span>
            </p>
          </div>

          {/* Search History */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Past Searches</h2>

            {history.length === 0 ? (
              <p className="text-gray-400">No past searches yet.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 bg-muted rounded-lg flex justify-between"
                  >
                    <span>{item.text}</span>
<span className="text-sm text-gray-400">
  {new Date(item.created_at).toLocaleString()}
</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button
            onClick={() => navigate("/check-prescription")}
            className="w-full mb-4"
          >
            Check Prescription
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;