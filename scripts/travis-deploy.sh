SOURCE_BRANCH="master"

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy."
    npm run build || exit 1
    exit 0
fi

openssl aes-256-cbc -K $encrypted_ac7688161307_key -iv $encrypted_ac7688161307_iv -in travis_deploy.enc -out travis_deploy -d
chmod 600 travis_deploy
eval `ssh-agent -s`
ssh-add travis_deploy

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

npm run deploy || exit 1
