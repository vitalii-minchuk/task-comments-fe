/* eslint-disable no-continue */
import _isNull from 'lodash.isnull';
import _filter from 'lodash.filter';
import { Comment } from '../apollo/generated/schema';

// type CommentWithChildren = Comment & {
//   children: Array<CommentWithChildren>;
// };
function formatComments(comments: Array<Comment>) {
  const roots = _filter(comments, (comment) => {
    return _isNull(comment.parentId);
  });

  // const map = new Map();

  // const roots: Array<CommentWithChildren> = [];

  // for (let i = 0; i < comments.length; i += 0) {
  //   const commentId = comments[i]?.id;

  //   map.set(commentId, i);

  //   const obj = Object.create(comments[i]);

  //   (obj as CommentWithChildren).children = [];

  //   if (typeof obj?.parentId === 'string') {
  //     const parentCommentIndex = map.get(obj?.parentId);

  //     (comments[parentCommentIndex] as CommentWithChildren).children.push(
  //       obj as CommentWithChildren
  //     );

  //     continue;
  //   }
  // }

  return roots;
}
export default formatComments;
