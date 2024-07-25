/*
    setup: 
        clear out database
        
    tests:
        create dummy task object(s)

        testing filters involving joins:
            /tasks?user_id=1
            /tasks?project_id=1

        regular filters:
            /tasks
            /tasks?status=Open
            /tasks?priority=High
            /tasks?project_id=1&status=Open&priority=High

    teardown:
        clear out database
*/