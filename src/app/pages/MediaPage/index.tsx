import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AllMovies } from './AllMovies';
import { AllSeries } from './AllSeries';
import { Series } from './Series';
import { Movie } from './Movie';

export function MediaPage() {
  return (
    <Switch>
      <Route exact path="/media" component={AllSeries} />
      <Route exact path="/media/series/:id" component={Series} />
      <Route exact path="/media/movies" component={AllMovies} />
      <Route exact path="/media/movies/:id" component={Movie} />
    </Switch>
  );
}

/*
    <Grid container>
      <Grid xs={2}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid xs={8}>Page</Grid>
    </Grid>
 */
