# Define a variable to store the command to delete node_modules folders
RM := rm -rf

# Define a function to find all node_modules folders
FIND_NODE_MODULES = $(shell find . -name "node_modules")

# Define the default target
.PHONY: clean
clean:
	@echo "Cleaning up node_modules folders..."
	@$(RM) $(FIND_NODE_MODULES)
	@echo "Node_modules folders cleaned up."
