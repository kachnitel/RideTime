import { User } from '../UserStore.mobx'
import { Comment } from '../CommentStore.mobx'

/* eslint-env jest */
test('Comment.seenByUser should return whether it has been marked seen', () => {
  let comment = new Comment()
  let user = new User()
  user.updateId(1)
  expect(comment.seenByUser(user)).toBe(false)
  comment.addSeenBy(1)
  expect(comment.seenByUser(user)).toBe(true)
})
