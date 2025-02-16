import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";

interface Perfume {
  id: string;
  name: string;
  brand: { name: string };
  image_url: string;
  rating: number;
  total_ratings: number;
  total_reviews: number;
  status: string[];
  gender: string;
  concentration: string;
  release_year: number;
  collection: string;
  country: string;
  segment: string;
  notes: Array<{
    name: string;
    percentage: number;
    icon: string;
  }>;
}

const PerfumeDetail = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const { data, error } = await supabase
          .from("perfumes")
          .select(
            `
            *,
            brand:brand_id(name)
          `,
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setPerfume(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPerfume();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!perfume) return <div className="p-8 text-center">Perfume not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex gap-8">
          {/* Left column - Image */}
          <div className="w-1/3">
            <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden">
              <img
                src={perfume.image_url}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right column - Details */}
          <div className="w-2/3">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{perfume.name}</h1>
                <p className="text-xl text-muted-foreground">
                  {perfume.brand.name}
                </p>
              </div>
              <div className="flex gap-2">
                {perfume.status?.map((status) => (
                  <Badge
                    key={status}
                    variant={status === "TOP-100" ? "default" : "secondary"}
                    className="px-3 py-1"
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium mb-2">Gender</h3>
                <p>{perfume.gender}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Concentration</h3>
                <p>{perfume.concentration}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Year</h3>
                <p>{perfume.release_year}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Collection</h3>
                <p>{perfume.collection}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Country</h3>
                <p>{perfume.country}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Segment</h3>
                <p>{perfume.segment}</p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button className="flex-1">Buy</Button>
              <Button variant="outline" className="flex-1">
                Write review
              </Button>
            </div>

            <Tabs defaultValue="composition" className="w-full">
              <TabsList>
                <TabsTrigger value="composition">Composition</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({perfume.total_reviews || 0})
                </TabsTrigger>
                <TabsTrigger value="versions">Versions</TabsTrigger>
                <TabsTrigger value="similar">Similar</TabsTrigger>
              </TabsList>

              <TabsContent value="composition" className="mt-6">
                <div className="space-y-4">
                  {perfume.notes?.map((note) => (
                    <div key={note.name} className="flex items-center gap-4">
                      <div className="w-8 text-2xl">{note.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span>{note.name}</span>
                          <span>{note.percentage}%</span>
                        </div>
                        <Progress value={note.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="text-center py-8 text-muted-foreground">
                  Reviews coming soon
                </div>
              </TabsContent>

              <TabsContent value="versions">
                <div className="text-center py-8 text-muted-foreground">
                  Versions coming soon
                </div>
              </TabsContent>

              <TabsContent value="similar">
                <div className="text-center py-8 text-muted-foreground">
                  Similar perfumes coming soon
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerfumeDetail;
