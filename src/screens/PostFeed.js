import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, TouchableOpacity } from 'react-native';

import { supabase } from '../utils/supabase';
import PostList from '../components/PostBody';


export default function PostFeed() {
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
    });
    const [posts, setPosts] = useState([]);
    const [createPost, setCreatePost] = useState(false);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('post')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) {
            setPosts(data);
        }
    };

    const handlePost = async () => {
        if (newPost.title === '' || newPost.content === '') {
            return Alert.alert('Error', 'Please fill in all fields');
        }
        const { error } = await supabase.from('post').insert([{ title: newPost.title, content: newPost.content }]);
        if (!error) {
            setNewPost({
                title: '',
                content: '',
            });
            setCreatePost(false);
        }

    };

    useEffect(() => {
        const channel = supabase
            .channel('post')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'post' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {

                        setPosts((prev) => [payload.new, ...prev]);
                    } else if (payload.eventType === 'DELETE') {

                        setPosts((prev) => prev.filter((post) => post.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);


    const deletePost = async (postId) => {
        const { error } = await supabase
            .from('post')
            .delete()
            .eq('id', postId);

        if (error) {
            console.error('Delete Error:', error.message);
            return;
        }

        setPosts((prev) => prev.filter((post) => post.id !== postId));
    };


    const handleLongPress = (item) => {
        Alert.alert(
            'Delete Post',
            `Are you sure you want to delete this post titled "${item.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deletePost(item.id) },
            ]
        );
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 800 }}>Post Feed</Text>
            {createPost ? (
                <View marginTop={10} style={{ overflow: "scroll" }}>
                    <TextInput
                        placeholder="Post Title"
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 }}
                        value={newPost.title}
                        onChangeText={(text) => setNewPost((prev) => ({ ...prev, title: text }))}
                    />
                    <TextInput
                        placeholder="Write a post..."
                        multiline
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10, maxHeight: 350 }}
                        value={newPost.content}
                        onChangeText={(text) => setNewPost((prev) => ({ ...prev, content: text }))}
                    />
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, gap: 10 }}>

                        <View style={{ flex: 1 }}>
                            <Button title="Cancel" onPress={() => setCreatePost(false)} color="black" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button title="Post" onPress={handlePost} color="black" />
                        </View>
                    </View>
                </View>
            ) : <Button title='Create new Post' color='black' onPress={() => setCreatePost(true)} />}


            <PostList posts={posts} onLongPress={handleLongPress} />

        </View>
    );
}
