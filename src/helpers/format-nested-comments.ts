import _filter from 'lodash.filter';
import { Comment } from '../apollo/generated/schema';

function formatNestedComments({
  data,
  id,
}: {
  data: Array<Comment>;
  id?: string;
}) {
  console.log(data);
  const nested = _filter(data, (comment) => {
    console.log(id);
    return comment.parentId === id;
  });
  console.log(nested);
  return nested;
}
export default formatNestedComments;
