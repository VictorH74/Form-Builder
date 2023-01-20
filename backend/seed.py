from testapp.models import BaseModelTest, ChildrenTestA, ChildrenTestB, ModelTestMain


main_1 = ModelTestMain(id=1).save()
main_2 = ModelTestMain(id=2).save()

BaseModelTest(content="base model test", main=main_1).save()
ChildrenTestA(content="children A test", children_a_content="me as model A", main=main_1).save()
ChildrenTestA(content="children A test II", children_a_content="me as model A 2", main=main_2).save()
ChildrenTestB(content="children B test", children_b_content="me as model B", main=main_1).save()

# python manage.py shell < seed.py