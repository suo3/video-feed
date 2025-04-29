"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addCommentAction, getVideoComments } from "@/app/actions";
import { useParams } from "next/navigation";
import { UserRoundIcon } from "lucide-react";

interface Comment {
  id: any;
  content: any;
  video_slug: any;
  created_at: any;
  author: any;
}
export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const { slug } = useParams();

  const fetchComments = async () => {
    try {
      if (slug !== undefined) {
        const { comments } = await getVideoComments(slug.toString());
        setComments(comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Add new comment to the list
    const comment = {
      video_slug: slug && slug.toString(),
      content: newComment,
    };
    await addCommentAction(comment);
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);
  return (
    <div className="max-w-4xl mx-auto px-1">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full resize-none mb-2"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 border-b pb-4">
              <UserRoundIcon className="dark:bg-purple-600 h-10 w-10 p-2 rounded-full bg-purple-300" />

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium capitalize">
                    {comment.author.split("@")[0]}
                  </span>
                  <span className="text-sm text-gray-500">
                    {comment.created_at.split("T")[0]}
                  </span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}
