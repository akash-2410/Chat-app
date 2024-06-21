// import mongoose from "mongoose";
// // import Message from "./message.model.js";

// const conversationSchema = new mongoose.Schema({
// participants:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required:true
//     }],
//     messages:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Message",
//         required:true
//     }
// ]
// },{timestamps:true});

// const Conversation = mongoose.model("Conversation", conversationSchema);

// export default Conversation;


import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;