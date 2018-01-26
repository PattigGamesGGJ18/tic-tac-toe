# import deploy config
# You can change the default deploy config with `make dpl="deploy_special.env" release`
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

# grep the version from the mix file
VERSION=$(shell jq -rM '.version' package.json)


# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help build build-nc

help: ## Display this help message
	@printf "Usage: make [var=value] [commands...]\n\n"
	@printf "A Makefile for deploying the pattig games webinterface to a docker registry.\n\n"
	@printf "Commands:\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "   %-22s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@printf "\nVariables:\n"
	@printf "   %-22s %s\n" "dpl" "Specify the path to the deploy configuration (default: deploy.env)"
	@printf "\nAuthors:\n"
	@printf "   Fin Christensen <christensen.fin@gmail.com>\n"
	@printf "   Johannes Wünsche <johannes.wuensche@st.ovgu.de>\n"
	@printf "\npattig games build system - Copyright (c) 2018  Fin Christensen, Johannes Wünsche\n"

.DEFAULT_GOAL := help


# DOCKER TASKS
# Build the container
build: ## Build the app and container
	@npm run build
	@docker build \
		--build-arg APP_NAME="$(APP_NAME)" \
		-t $(APP_NAME) .

build-nc: ## Build the app and container without caching
	@npm run build
	@docker build --no-cache \
		--build-arg APP_NAME="$(APP_NAME)" \
		-t $(APP_NAME) .

run: ## Run container on port 1337
	@docker run -i -t --rm -p=1337:8000 --name="$(APP_NAME)" $(APP_NAME)

up: build run ## Build and run container on port 1337

stop: ## Stop and remove a running container
	@docker stop $(APP_NAME)
	@docker rm $(APP_NAME)

release: build-nc publish ## Make a release by building and publishing the current version

# Docker publish
publish: publish-latest publish-version ## Publish the current version and the <latest> tag

publish-latest: tag-latest ## Publish the <latest> tag to the configured docker registry
	@echo 'Publishing latest to $(DOCKER_REPO)...'
	@docker push $(DOCKER_REPO)/$(APP_NAME):latest

publish-version: tag-version ## Publish the <{version}> tag to the configured docker registry
	@echo 'Publishing $(VERSION) to $(DOCKER_REPO)...'
	@docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# Docker tagging
tag: tag-latest tag-version ## Generate container tags for <{version}> and <latest>

tag-latest: ## Generate container with the <latest> tag
	@echo 'Creating tag <latest>...'
	@docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):latest

tag-version: ## Generate container with the <{version}> tag
	@echo 'Creating tag <$(VERSION)>...'
	@docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

version: ## Print the current version
	@echo $(VERSION)
