import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const slug= req.query["slug"];

    if(!slug || typeof slug !== 'string') {
        return res.status(404).json({message: "Slug not valid"});
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: slug as string
        }
    })

    if (!data) {
        return res.status(404).json({message: "Slug not found"});
    }

    return res.json({url: data.url});
}