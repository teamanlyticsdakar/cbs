using Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace Read
{
    public class ProjectEventProcessor : Infrastructure.Events.IEventProcessor
    {
        readonly IProjects _projects;

        public ProjectEventProcessor(IProjects projects)
        {
            _projects = projects;
        }

        public void Process(ProjectCreated @event)
        {
            var project = _projects.GetById(@event.Id);
            project.Name = @event.Name;
            _projects.Save(project);


        }
    }
}
