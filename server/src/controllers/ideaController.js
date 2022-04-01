const Comment = require('../models/cmtModel');
const Idea = require('../models/ideaModel');
const Category = require('../models/ideaCategoryModel');
const Account = require('../models/accountModel');
const Task = require('../models/taskModel');
const account = require('../models/accountModel')
const reqLogin = require('../middlewares/authJwt')

const checkUser = reqLogin.checkCurrentUser;

class ideaController {
 
  //[GET] /idea/detail/:slug
  detail(req, res, next) {
    Account.findOne({ _id: req.data._id})
    const commments = Comment.find({});
    Idea.findById({ _id: req.params.id })
      .lean()
      .populate('comments', 'content')
      .populate('account','username')
      .then((ideas) => {
        res.render('idea/detail', { ideas: ideas });
      })
      .catch(next);
  }

  //[GET] /idea/create
  async create(req, res, next) {
    // const tasks = await Task.find({}).lean();
    res.render('idea/create');
  }

  async store(req, res, next) {
    const formData = {
      title: req.body.title,
      description: req.body.description,
      slug: req.body.slug,
      file: req.file.originalname,
      
    };
   
    // const task = await Task.findOne({ title: req.body.tasks });
    // if (!task) {
    //   return res.render('idea/create', {
    //     error: true,
    //     message: 'Task does not exist!',
    //   });
    // }

    // formData.tasks = task._id;
    const idea = new Idea(formData);
    idea.upVotes = [];
    idea.downVotes = [];
    await idea
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

  async listTask(req, res, next) {
    // const ideaCategory = await Category.find({});
    await Task.find({  })
      // .lean()
      // .populate('ideaCategory', 'name', 'ideaCategories')
      .then((task) => {
        res.render('idea/listTask', {
          task: task,
        });
      })
      .catch(next);
  }
}

module.exports = new ideaController();
