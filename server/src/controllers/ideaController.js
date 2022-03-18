const Idea = require('../models/ideaModel');

class ideaController {
  //[GET] /idea/detail/:slug
  detail(req, res, next) {
    Idea.findOne({ slug: req.params.slug })
      .then((ideas) => {
        res.render('idea/detail', { ideas: ideas });
      })
      .catch(next);
  }

  //[GET] /idea/create
  create(req, res, next) {
    res.render('idea/create');
  }

  //[POST] /idea/store
  store(req, res, next) {
    const formData = {
      title: req.body.title,
      description: req.body.description,
      slug: req.body.slug,
      image: req.body.image,
      file: req.file.originalname,
    };
    const idea = new Idea(formData);
    idea
      .save()
      .then(() => {
        res.redirect('/main/show');
      })
      .catch((error) => {
        res.send('Failed saved');
      });
  }

  //[GET] /idea/storedIdeas
  storedIdeas(req, res, next) {
    Idea.find({})
      .then((ideas) => {
        res.render('idea/storedIdeas', { ideas: ideas });
      })
      .catch(next);
    // res.render('idea/storedIdeas');
  }

  //[GET] /idea/:id/update
  update(req, res, next) {
    Idea.findById(req.params.id)
      .then((ideas) => {
        res.render('idea/update', {
          ideas: ideas,
        });
      })
      .catch(next);
  }

  //[PUT] /idea/:id
  updateIdea(req, res, next) {
    Idea.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/idea/storedIdeas'))
      .catch(next);
  }

  //[DELETE] /idea/:id
  deleteIdea(req, res, next) {
    Idea.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /idea/:id/forceDeleteIdea
  forceDeleteIdea(req, res, next) {}
}

module.exports = new ideaController();
