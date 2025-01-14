import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

const PostList = ({ posts, onLongPress }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onLongPress={() => onLongPress(item)}
          style={styles.postContainer}
        >
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.content}>{item?.content}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E5E7E9",
    maxHeight: 200,
    overflow: "scroll",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E86C1",
  },
  content: {
    fontSize: 14,
  },
});

export default PostList;
