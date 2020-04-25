import React, {useEffect, useState} from "react";
import {MediaProps} from "./components/media";
import * as Scry from "../../services/scry";
import {MediaTable} from "./components/table";

export const MediaList = () => {
    const [media, setMedia] = useState<MediaProps[]>([]);

    useEffect(() => {
        Scry.Media({type: "episode"}).then((res) => {
            console.log(res);
            setMedia(res.Media)
        });
    }, [])

    return (
        <MediaTable media={media}/>
    )
}
