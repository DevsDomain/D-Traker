import mongoose from "mongoose";

const uri = "mongodb+srv://devsdomain88:gid3AfCsphigMiAS@api3visiona.ix0g9fk.mongodb.net/dbVisiona"
const uriLocal = "mongodb://localhost:27017/dbVisiona"

export default function connect() {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("disconnected", () => console.log("Database Disconnected"));
 
 
   mongoose.connect(uriLocal, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
        serverApi:{version:'1',strict:true, deprecationErrors:true}
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((e) => {
            console.error("Connection Failed", e.message)
        })

    process.on("SIGINT", async () => {
        try {
            console.log("Connection closed");
            await mongoose.connection.close();
            process.exit(0);
        }
        catch (error) {
            console.error("Problems to close the connection", error);
            process.exit(1);
        }
    })
}