if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy."
    npm run build
    exit 0
fi

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

git clone $REPO build
cd build
git checkout 
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

rm -rf build/**/* || exit 0

npm run build

cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ -z `git diff --exit-code` ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

openssl aes-256-cbc -K $encrypted_ac7688161307_key -iv $encrypted_ac7688161307_iv -in travis_deploy.enc -out travis_deploy -d
chmod 600 travis_deploy
eval `ssh-agent -s`
ssh-add travis_deploy

git push $SSH_REPO $TARGET_BRANCH
