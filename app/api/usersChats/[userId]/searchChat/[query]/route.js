import { connectToDB } from "@utils/database";
import Chat from "@models/chat";
import Message from "@models/message";
import User from "@models/user";
import Job from "@models/job";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId, query } = params;

    const chats = await Chat.find({
      members: { $in: [userId] },
    })
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

    const searchedChat = chats.filter((chat) =>
      chat.members.some((member) => new RegExp(query, "i").test(member.name)),
    );

    return new Response(JSON.stringify(searchedChat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to search chat", { status: 500 });
  }
};
