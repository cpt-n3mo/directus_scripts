# Script to apply snapshots with groups to directus
when using groups, to order the collections, and a snapshot is made it will fail to apply.
This script first removes all groups from the snapshot, and then applies it to the database,
it then updates the database with the original snapshot including groups,
this will get around the bug.

# usage
copy your snapshotfile to the script directory.
apply snapshot using following command.
node applySnapshot.js ./snapShot.json

# note
this script only works on json files
