let express = require(`express`);
let app = express();
let PORT = process.env.PORT || 3003;

app.listen(PORT, function() {
    console.log(`http://localhost:` + PORT);
})

app.use(express.static(`public`));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const hbs = require('hbs');
app.set('views', 'views');
app.set('view engine', 'hbs');

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Pamyatkaplus')

let taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: String,
    isChecked: Boolean,
    author_id: {
        type: mongoose.ObjectId,
        ref: 'user'
    },
    author_name: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

let feedbackSchema = new mongoose.Schema({
    title: String,
    description: String,
    positive: Number,
    negative: Number
}, {
    timestamps: true
})

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    profile_image: String
})

let Feedback = mongoose.model('feedback', feedbackSchema)
let Task = mongoose.model('task', taskSchema)
let User = mongoose.model('user', userSchema)

//статичная часть сайта
app.get(`/`, function(req, res){
    res.redirect(`/main`)
})

app.get(`/main`, function(req, res){
    res.render(`main`)
})

app.get(`/video`, function(req, res){
    res.render(`video`)
})

app.get(`/reminder`, function(req, res){
    res.render(`reminder`)
})

app.get(`/test1`, function(req, res){
    res.render(`test1`)
})

app.get(`/test2`, function(req, res){
    res.render(`test2`)
})

app.get(`/test3`, function(req, res){
    res.render(`test3`)
})

app.get(`/test4`, function(req, res){
    res.render(`test4`)
})

app.get(`/pamyatkaplus`, function(req, res){
    res.redirect(`/pamyatkaplus/start`)
})

app.get(`/pamyatkaplus/start`, function(req, res){
    res.render(`start`)
})

// конец статики

app.get(`/pamyatkaplus/login`, function(req,res) {
    let error = req.query.error

    res.render(`enter`, {error: error})
})

app.post(`/pamyatkaplus/login`, async function(req,res){
    let email = req.body.email
    let password = req.body.password

    if(email === 'admin@gmail.com' && password === 'logadminuser') {
        res.redirect(`/adminka?uniqueidentificatoradminkaaccessopenqazwsxedcrfvtgbyhnujmqwertyuiopasdfghjklzxcvbnm=1`)
        return
    }

    let usermenu = await User.findOne({ email: email, password: password })
    if (!usermenu) {
        res.redirect(`/pamyatkaplus/login?error=1`)
        return
    }

    res.redirect(`/pamyatkaplus/navigation?usermenu=${usermenu._id}`)
})

app.get(`/pamyatkaplus/register`, function(req,res) {
    let error = req.query.error

    res.render(`registration`, {error: error})
})

app.post(`/pamyatkaplus/register`, async function(req, res) {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let check = req.body.check

    let double = await User.exists({ name: name })
    
    if(email === 'admin@gmail.com') {
        res.redirect(`/pamyatkaplus/register?error=1`)
        return
    }

    if (double) {
        res.redirect(`/pamyatkaplus/register?error=1`)
        return
    }

    let double2 = await User.exists({ email: email })

    if (double2) {
        res.redirect(`/pamyatkaplus/register?error=1`)
        return
    }

    let profile_image = '/assets/no-profile-image.png'

    if (!check) {
        res.redirect(`/pamyatkaplus/register?error=2`)
        return
    }

    let user = new User({
        name: name,
        email: email,
        password: password,
        profile_image: profile_image
    })

    await user.save()
    res.redirect(`/pamyatkaplus/login`)
})

app.get(`/pamyatkaplus/navigation`, async function(req,res){    
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    res.render(`nav`, {usermenu: usermenu})
})

app.get(`/pamyatkaplus/profile`, async function(req,res) {
    let usermenu = await User.findOne({_id: req.query.usermenu})
    let success = req.query.success
    let error = req.query.error

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    res.render(`profile`, {usermenu: usermenu, success: success, error: error})
})

app.post(`/pamyatkaplus/profile/edit`, async function(req,res){
    let usermenu = await User.findOne({_id: req.query.usermenu})
    let newusername = req.body.name
    usermenu.name = newusername
    usermenu.email = req.body.email
    usermenu.password = req.body.password
    let image = req.body.image

    if (!image) {
        usermenu.profile_image = '/assets/no-image.png';
    } else {
        usermenu.profile_image = image;
    }

    try {
    await usermenu.save()
    
    await Task.updateMany({author_id: usermenu._id}, {author_name: newusername})
    res.redirect(`/pamyatkaplus/profile?usermenu=${usermenu._id}&success=1`)
    } catch {
        res.redirect(`/pamyatkaplus/profile?usermenu=${usermenu._id}&error=1`)
    }
})

app.get(`/pamyatkaplus/feedback`, async function(req, res) {
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    let feedback = await Feedback.find().sort({createdAt: -1}).limit(5)
    // res.sendFile(__dirname + '/views/discussion.hbs')
    res.render(`discussion`, {usermenu: usermenu})
})

app.get('/pamyatkaplus/feedback/all', async function(req, res){
    let feedback = await Feedback.find().sort({createdAt: -1}).limit(5)

    res.send(feedback)
})

app.post('/pamyatkaplus/feedback/create', async function(req, res){
    let title = req.body.title
    let description = req.body.description

    let feedback = new Feedback({
        title: title,
        description: description,
        positive: 0,
        negative: 0
    })

    await feedback.save()

    res.send(feedback)
})

app.post(`/pamyatkaplus/feedback/positive`, async function(req, res) {
    let id = req.body.id
    let feedback = await Feedback.findOne({ _id: id })

    if (!feedback) {
        res.sendStatus(404)
        return
    }

    feedback.positive += 1
    await feedback.save()

    res.send(feedback)
})

app.post(`/pamyatkaplus/feedback/negative`, async function(req, res) {
    let id = req.body.id
    let feedback = await Feedback.findOne({ _id: id })

    if (!feedback) {
        res.sendStatus(404)
        return
    }

    feedback.negative += 1
    await feedback.save()

    res.send(feedback)
})

app.get(`/pamyatkaplus/tasks/my`, async function(req,res) {
    let error = req.query.error
    let success = req.query.success
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if (!usermenu) {
        res.redirect(`/pamyatkaplus/start`);
        return;   
    } 

    let tasks = await Task.find({isChecked: true, author_id: usermenu._id}).sort({ createdAt: -1 })

    res.render(`createtask`, {
        error: error,
        success: success,
        tasks: tasks,
        usermenu: usermenu
    })
})

app.post(`/pamyatkaplus/tasks/my/create`, async function(req, res) {
    let title = req.body.title;
    let category = req.body.category;
    let description = req.body.description;
    let answer = req.body.answer;
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if (!title || !category || !description || !answer) {
      res.redirect(`/pamyatkaplus/tasks/my?usermenu=${usermenu._id}&error=1`);
      return;
    }
  
    let double = await Task.exists({ title: title });
  
    if (double) {
    
      res.redirect(`/pamyatkaplus/tasks/my?usermenu=${usermenu._id}&error=1`);
      return;
    }
  
    let image = req.body.image;
  
    if (!image) {
      image = '/assets/no-image.png';
    }
  
    let task = new Task({
      title: title,
      description: description,
      category: category,
      image: image,
      isChecked: false,
      author_id: usermenu._id,
      author_name: usermenu.name,
      answer: answer
    });

    await task.save();
    res.redirect(`/pamyatkaplus/tasks/my?usermenu=${usermenu._id}&success=1`);
  });

app.get(`/pamyatkaplus/tasks`, async function(req,res) {
    let success = req.query.success
    let error = req.query.error
    let id = req.query.id
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    let tasks = req.query.tasks ? JSON.parse(req.query.tasks) : await Task.find({isChecked: true})

    let answer = await Task.findOne({_id: id})
    res.render(`tasks`, {tasks: tasks, usermenu: usermenu, success: success, error: error, answer: answer})
})

app.post(`/pamyatkaplus/tasks/solve`, async function(req,res) {
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    let id = req.query.id
    let youranswer = req.body.youranswer
    let answer = await Task.findOne({_id: id})

    if(youranswer === answer.answer) {
        res.redirect(`/pamyatkaplus/tasks?usermenu=${usermenu._id}&id=${id}&success=1`)
    } else {
        res.redirect(`/pamyatkaplus/tasks?usermenu=${usermenu._id}&id=${id}&error=1`)
    }
})

app.post(`/pamyatkaplus/tasks/search`, async function(req,res) {
    let usermenu = await User.findOne({_id: req.query.usermenu})

    if(!usermenu) {
        res.redirect(`/pamyatkaplus/start`)
        return
    }

    let title = req.body.title
    let category = req.body.category
    let sort = Number(req.body.sort)
    let search = {isChecked: true}

    if(title) {
        search.title = {$regex: title, $options: 'i'}
    }

    if(category) {
        search.category = category
    }

    let sorting = {createdAt: sort}
    let tasks = await Task.find(search).sort(sorting).limit(10)

    res.redirect(`/pamyatkaplus/tasks?usermenu=${usermenu._id}&tasks=${JSON.stringify(tasks)}`)

})

app.get(`/adminka`, async function(req,res) {
    let success = req.query.uniqueidentificatoradminkaaccessopenqazwsxedcrfvtgbyhnujmqwertyuiopasdfghjklzxcvbnm
    if(!success) {
        res.redirect(`/adminkа`)
        return
    }

    let tasks = await Task.find({isChecked: false}).sort({createdAt: -1})
    let taskAll = await Task.find({isChecked: true})
    let feedbackAll = await Feedback.find().sort({createdAt: -1})
    let users = await User.find()

    res.render(`admin`, {tasks: tasks, taskAll: taskAll, feedbackAll: feedbackAll, success: success, users: users})
})

app.get(`/adminka/feedback/remove`, async function(req,res) {
    let id = req.query.id

    if(!id) {
        res.redirect(`/adminka/feedback/rеmоve`)
        return
    }

    let feedback = await Feedback.deleteOne({_id: id})
    res.redirect(`back`)
})

app.get(`/adminka/users/remove`, async function(req,res) {
    let id = req.query.id

    if(!id) {
        res.redirect(`/adminka/feedback/rеmоve`)
        return
    }

    let user = await User.deleteOne({_id: id})
    res.redirect(`back`)
})

app.get(`/adminka/task/remove`, async function(req,res) {
    let id = req.query.id

    if(!id) {
        res.redirect(`/adminka/task/rеmоve`)
        return
    }

    let task = await Task.deleteOne({_id: id})
    res.redirect(`back`)
})

app.get(`/adminka/task/edit`, async function(req,res) {
    let id = req.query.id
    let task = await Task.findOne({_id: id})
    let error = req.query.error
    let success = req.query.success

    if(!id) {
        res.redirect(`/adminka/task/еdit`)
        return
    }

    let options = ``
    let categories = ['Легкое', 'Среднее', 'Сложное'];
    for(let i = 0; i < categories.length; i++){
        let category = categories[i]
        let selected = ``
        if(category == task.category) {
            selected = 'selected'
        }
        options += `<option value="${category}" ${selected}>${category}</option>`
    }
    res.render(`edit`, {
        task: task,
        error: error,
        success: success,
        options: options
    })
})

app.post(`/adminka/task/edit`, async function(req,res) {
    let id = req.query.id
    let task = await Task.findOne({_id: id})
    let isChecked = req.body.isChecked

    if(isChecked == 'on') {
        task.isChecked = true;
    } else {
        task.isChecked = false;
    }
    task.title = req.body.title;
    task.description = req.body.description
    let image = req.body.image;
    task.answer = req.body.answer

    if (!image) {
        task.image = '/assets/no-image.png';
    } else {
        task.image = image;
    }
    task.category = req.body.category

    try{
        await task.save()
        res.redirect(`/adminka/task/edit?id=${id}&success=1`)
    } catch (err) {
        res.redirect(`/adminka/task/edit?id=${id}&error=1`)
    }
})

app.use(function(req, res, next) {
    res.render(`error`);
});