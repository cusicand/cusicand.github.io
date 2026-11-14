# Website + CV in one place. The CV sources live in _cv/ (git-ignored).
#
#   make cv       rebuild the CV PDFs (FR, EN, ES) and update the website from the CV data
#   make cv-web   update the website from the CV data, without recompiling LaTeX
#   make serve    run the local website at http://localhost:4000

.PHONY: cv cv-web serve

cv:
	$(MAKE) -C _cv
	$(MAKE) -C _cv web

cv-web:
	cd _cv && python3 web_export.py --no-pdf

serve:
	bundle exec jekyll serve --livereload --config _config.yml,_config.dev.yml
