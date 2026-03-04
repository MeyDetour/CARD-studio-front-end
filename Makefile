init :
	npm run dev

reset-git : 
	sudo rm -R .git
	git init
	git remote add origin https://github.com/MeyDetour/CARD-studio-front-end.git
	git add .
	git commit -m "fix git object error"
	git push -uf --set-upstream origin master