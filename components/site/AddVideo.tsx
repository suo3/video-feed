"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, Video } from "lucide-react";
import { addVideoAction } from "@/app/actions";

interface Category {
  id: string;
  name: string;
  slug: string;
}
interface addNewVideo {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isFeatured: boolean;
  videoUrl: string;
}
const cats = {
  "15": "Entertainment",
  "16": "Travel",
  "17": "Arts",
  "18": "Technology",
  "19": "Nature",
  "20": "People",
};
export default function AddVideo({
  categories: categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    isFeatured: false,
    videoUrl: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === "checkbox" && target instanceof HTMLInputElement) {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSelectChange = (value: string) => {
    console.log(value);
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const catSlug = cats[formData.category as keyof typeof cats].toLowerCase();
    try {
      await addVideoAction({
        title: formData.title,
        description: formData.description,
        thumbnail_url: formData.thumbnail,
        video_url: formData.videoUrl,
        category_id: Number(formData.category),
        featured: Boolean(formData.isFeatured), // Convert to boolean formData.isFeatured,
        cat_slug: catSlug,
        video_slug: formData.title,
      });
      router.push("/");
    } catch (error) {
      console.error("Error submitting video:", error);
      alert("Error submitting video. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Add New Video
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Share your creative content with the Vlog community
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>
              Fill out the form below to upload your video to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title for your video"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your video in detail"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category">
                      {formData.category
                        ? cats[formData.category as keyof typeof cats]
                        : "Select a category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="thumbnail"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Thumbnail Image
                  </Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    placeholder="Enter a valid URL for your thumbnail image"
                    required
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                  />

                  {thumbnailPreview && (
                    <div className="mt-4">
                      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border border-gray-200">
                        <div className="relative h-full w-full">
                          <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video URL
                  </Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    placeholder="Enter a valid URL for your video (YouTube, Vimeo, etc.)"
                    required
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className=" flex items-center">
                  <Input
                    id="isFeatured"
                    name="isFeatured"
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    style={{ width: "auto" }}
                  />
                  <Label className="ml-2 mt-0 py-0" htmlFor="isFeatured">
                    Is video featured
                  </Label>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Uploading..." : "Upload Video"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
