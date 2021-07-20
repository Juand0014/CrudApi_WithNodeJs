'use strict'

const Project = require('../models/project');
const fs = require('fs');

const controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'soy la home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'soy el metodo o accion test de controlador de project'
        });
    },

    saveProject: (req, res)=>{
        let project = new Project();

        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.lengs = params.lengs;
        project.image = null;

        project.save((err, projectStored)=>{
            if(err) return res.status(500).send({message: 'Error to save.'});

            if(!projectStored) return res.status(404).send({message: 'Dont save this project'});

            return res.status(200).send({project: projectStored});
        });    
    },
    getProject: function(req, res){
        const projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'Dont exist this project'});

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: 'Error to filter.'});

            if(!projectId) return res.status(404).send({message: 'Dont exist this proyect'});

            return res.status(200).send({project});
        });
    },
    getProjects: function(req, res){

        Project.find({}).sort('-year').exec((err, projects)=>{

            if(err) return res.status(500).send({message: 'Error to search data'});

            if(!projects) return res.status(404).send({message: 'Not found data'});

            return res.status(200).send({projects});

        });
    },

    updateProject: function(req, res){
        const projectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUdated)=>{
            if(err) return res.status(500).send({message: 'Error to update'});

            if(!projectUdated) return res.status(404).send({message: 'Not found this proyect'});

            return res.status(200).send({project: projectUdated})

        });
    },

    deleteProject: function(req, res){
        const projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectRemove)=>{
            if(err) return res.status(500).send({message: 'Cant delete this proyect'});
            
            if(!projectRemove) return res.status(404).send({message: 'Not fount proyect to delete'});

            return res.status(200).send({project: projectRemove});
        })
    },

    uploadImage: function(req, res){
        const projectId = req.params.id;
        const fileName = 'Not Imaes...';
        if(req.files){
            let filePath = req.files.image.path;
            let fileName = filePath.split("\\")[1];
            let fileExt = fileName.split("\.")[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUdated)=>{
                    if(err) return res.status(200).send({message: 'Image not submit'});
    
                    if(!projectUdated) return res.status(404).send({message: 'Image not found'})
                    return res.status(200).send({project: projectUdated});
                }); 
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: 'Extention not valid'});
                });
            }
        }else{
            return res.status(200).send({message: fileName});
        }
    }
};

module.exports = controller;