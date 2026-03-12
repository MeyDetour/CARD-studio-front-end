init :
	npm run dev

git-reset : 
	sudo rm -R .git
	git init
	git remote add origin https://github.com/MeyDetour/CARD-studio-front-end.git
	git add .
	git commit -m "fix git object error"
	git push -uf --set-upstream origin master