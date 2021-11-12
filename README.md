#Script to apply snapshots with groups to directus
when using groups, to order the collections, and a snapshot is made it will fail to apply.
this script first removes all groups from the snapshot, and applies it to the database,
it then updates the database with the original snapshot including groups,
 this will get around the bug.

