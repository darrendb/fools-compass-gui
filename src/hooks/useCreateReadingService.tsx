import { useMutation, useQueryClient } from "react-query";

export const useCreateReadingService = (_jwt: string = '', _authorId: number = 0) => {
    // console.log("CreateReadingModal.useCreateReadingService()");
    const client = useQueryClient();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    return useMutation(
        // title, author, date, comment, image, slug
        async (data: { title: string; date: string; comment: string; image: File; slug: string; }) => {
            // console.log("data:");
            // console.log(data);


            // upload file/image
            const formData = new FormData();
            formData.append("files", data.image);
            const fileResp = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            const fileInfo = await fileResp.json();
            // console.log("fileInfo[0]:");
            // console.log(fileInfo[0]);
            // console.log("fileInfo[0].id:");
            // console.log(fileInfo[0].id);

            // post form as new Reading (including file/iimage)
            const readingPostResp = await fetch(`${BASE_URL}/readings`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${_jwt}`
                },
                method: "POST",
                // title, author, date, comment, image, slug
                body: JSON.stringify({
                    title: data.title,
                    author: _authorId,
                    date: new Date(),
                    comment: data.comment,
                    image: fileInfo[0].id,
                    // spread: data.spread,
                    slug: data.slug,
                }),
            });
            return await readingPostResp.json();
        },
        {
            onSuccess: () => {
                client.invalidateQueries("readingQueryKey");
            },
        }
    );
};

