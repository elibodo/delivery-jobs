import { connectToDB } from "@utils/database";
import Chat from "@models/chat";
import User from "@models/user";
import Message from "@models/message";
import Job from "@models/job";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;

    const allChats = await Chat.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({
        path: "members",
        model: User,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .populate({
        path: "jobAppliedTo",
        model: Job,
      })
      .exec();

    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get all chats of current user", {
      status: 500,
    });
  }
};
