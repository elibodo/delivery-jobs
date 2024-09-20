import Chat from "@models/chat";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { pusherServer } from "@lib/pusher";

export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    const { currentUserId, member, jobId } = body;

    const contactId = await User.findOne({ email: member });

    if (!contactId) {
      return new Response("User has been deleted", { status: 500 });
    }

    const query = {
      members: { $all: [currentUserId, contactId.id], $size: 2 },
      jobAppliedTo: { $eq: jobId },
    };

    let chat = await Chat.findOne(query);

    if (!chat) {
      chat = await Chat.create({
        members: [currentUserId, contactId.id],
        jobAppliedTo: jobId,
      });
      await chat.save();

      const updateAllMembers = chat.members.map(async (memberId) => {
        await User.findByIdAndUpdate(
          memberId,
          {
            $addToSet: { chats: chat._id },
          },
          { new: true }
        );
      });
      Promise.all(updateAllMembers);

      chat.members.map(async (member) => {
        await pusherServer.trigger(member._id.toString(), "new-chat", chat);
      });
    }
    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new chat", { status: 500 });
  }
};
