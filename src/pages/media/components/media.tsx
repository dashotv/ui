import React, {FunctionComponent, useState} from "react";
import {Card, Dimmer, Icon, Image} from 'semantic-ui-react'
import "./media.css"

export type MediaProps = {
    id?: string,
    name?: string,
    title?: string,
    display?: string,
    release_date?: string,
    description?: string,
    background?: string,
}

// const bg = (id: string | undefined) => {
//     //http://seer.dasho.net/media-images/series-5ea3f58c3359bb25334ff3be/background_thumb.jpg
//     return "http://seer.dasho.net/media-images/series-"+id+"/background_thumb.jpg"
// }
const bg = (bg: string | undefined) => {
    //http://seer.dasho.net/media-images/series-5ea3f58c3359bb25334ff3be/background_thumb.jpg
    if (bg) {
        return "http://seer.dasho.net" + bg
    }
    return "http://seer.dasho.net/media-images/series-5ea3f58c3359bb25334ff3be/background_thumb.jpg"
}

/*
  floating icon buttons
  <div class="content">
    <i class="right floated like icon"></i>
    <i class="right floated star icon"></i>
    <div class="header">Cute Dog</div>

  dimmable image, floating text/button/etc
    <div class="blurring dimmable image">
      <div class="ui dimmer">
        <div class="content">
          <div class="center">
            <div class="ui inverted button">Add Friend</div>
          </div>
        </div>
      </div>
      <img src="/images/avatar/large/elliot.jpg">
    </div>
 */

export const Media: FunctionComponent<MediaProps> = (media) => {
    const [active, setActive] = useState<boolean | undefined>(false)
    const content = (
        <div className="center">
            {/*<div className="ui inverted header">Description</div>*/}
            <div className="ui inverted content overflow-description">
                Ruby and Billy decide to spend a day in Chicago before making any rash decisions about their next moves. As the two anxiously await check-in at a lavish hotel, Ruby meets an exciting woman at a department store, while Billy tries to handle a relentless Fiona. Later, Billy comes clean about what drove him to run.
            </div>
        </div>
    )
    const dimmerShow = () => setActive(true)
    const dimmerHide = () => setActive(false)
    return (
        <Card>
            <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{active, content}}
                onMouseEnter={dimmerShow}
                onMouseLeave={dimmerHide}
                size="medium"
                src={bg(media.background)} wrapped ui={false}/>
            <Card.Content>
                <Icon className="right floated" name="star"/>
                <Card.Header>{media.title}</Card.Header>
                <Card.Meta>
                    {/*<span className='date'>{media.release_date}</span>*/}
                    <div className={"overflow-ellipsis"}>{media.display}</div>
                </Card.Meta>
                {/*<Card.Description>*/}
                {/*    {media.description}*/}
                {/*</Card.Description>*/}
            </Card.Content>
            {/*<Card.Content extra>*/}
            {/*    <Button.Group>*/}
            {/*        <Button icon={"undo"} />*/}
            {/*        <Button icon={"download"} />*/}
            {/*        <Button icon={"search"} />*/}
            {/*    </Button.Group>*/}
            {/*</Card.Content>*/}
        </Card>
    )
}
