Rooms.allow({
    insert (userId, doc) {
        return (userId && doc.owner === userId);
    }
});

Messages.allow({
    insert (userId, doc) {
        return (userId && doc.owner === userId);
    }
});