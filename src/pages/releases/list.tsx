import React, {useEffect, useState} from 'react';
import {ReleasesTable} from "./components/table"
import {ReleaseProps} from "./components/release"
import * as Scry from "../../services/scry"

export const ReleasesList = () => {
    const [releases, setReleases] = useState<ReleaseProps[]>([]);

    useEffect(() => {
        Scry.Releases({}).then((res) => {
            console.log(res);
            setReleases(res.Releases)
        });
    }, [])

    return (
        <ReleasesTable releases={releases}/>
    )
}
