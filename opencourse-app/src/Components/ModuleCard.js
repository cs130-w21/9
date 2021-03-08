import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

/**
 * For new module that is added in the edit course page.
 * @function  ModuleCard
 * @returns New HTML component for course module.
 */
export default function ModuleCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="moduleNumber">{props.index + 1}</Avatar>}
        action={
          <IconButton
            aria-label="settings"
            onClick={() => props.openModal(props.index)}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={props.module.title}
        // subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.module.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton> */}
        <IconButton aria-label="link" href={props.module.link} target="_blank">
          <ShareIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          style={{ marginLeft: "auto" }}
          onClick={() => props.deleteModule(props.module.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
