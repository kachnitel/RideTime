import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import { Comment as CommentEntity } from '../../stores/CommentStore.mobx'
import FormTextInput from '../form/FormTextInput'
import ButtonIcon from '../form/ButtonIcon'
import Comment from './Comment'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export default
@inject('CommentStore', 'UserStore')
@observer
class Comments extends Component {
  state = {
    loading: true,
    newComment: null
  }

  componentDidMount = () => {
    this.loadComments()
  }

  loadComments = () => {
    this.setState({ loading: true })
    this.props.CommentStore.loadCommentsAsync(this.props.event)
    this.setState({ loading: false })
  }

  addComment = () => <View style={styles.addCommentContainer}>
    <FormTextInput
      placeholder='Write comment'
      value={this.state.newComment}
      onChangeText={(val) => this.setState({ newComment: val })}
      disabled={this.state.loading}
    />
    <ButtonIcon icon='send' onPress={this.submitComment} />
  </View>

  submitComment = async (message: String) => {
    this.setState({ loading: true })
    await this.props.CommentStore.addComment(this.props.event, this.state.newComment)
    this.setState({ loading: false, newComment: null })
  }

  render () {
    let commentCount = this.props.CommentStore.getComments(this.props.event).length
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <Text style={styles.title}>
          Comments
          <Text style={styles.commentCount}>{commentCount}</Text>
        </Text>
        <FlatList
          data={this.props.CommentStore
            .getComments(this.props.event)
            .sort((a: CommentEntity, b: CommentEntity) => b.timestamp - a.timestamp)
          }
          renderItem={(item) => <Comment comment={item.item} />}
          inverted
          ListEmptyComponent={<Text style={styles.listEmptyText}>No comments yet</Text>}
          keyExtractor={(item: CommentEntity) => 'comment_' + item.id}
          onRefresh={this.loadComments}
          refreshing={this.state.loading}
          extraData={commentCount}
        />
        {this.addComment()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackground
  },
  addCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    position: 'absolute',
    top: Layout.window.hp(1),
    right: Layout.window.hp(1),
    backgroundColor: '#fff2',
    padding: Layout.window.hp(0.75),
    borderRadius: Layout.window.hp(1.5)
  },
  listEmptyText: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: '#fff3'
  },
  commentCount: {
    color: '#fff',
    backgroundColor: '#fff3'
  }
})
