import React, {useEffect, useState} from "react";
import {MediaProps} from "../media/components/media";
import * as Scry from "../../services/scry";
import {MediaTable} from "../media/components/table";

export const HomeList = () => {
    const [media, setMedia] = useState<MediaProps[]>([]);

    useEffect(() => {
        Scry.Upcoming().then((res) => {
            console.log(res);
            setMedia(res.Media)
        });
    }, [])

    return (
        <MediaTable media={media}/>
    )
}
