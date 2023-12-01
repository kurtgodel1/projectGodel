from django.test import TestCase, Client
from django.urls import reverse
import json

class PowerFunctionTests(TestCase):
    
    def setUp(self):
        # Set up the client to make requests
        self.client = Client()

    def test_calculate_power_function(self):
        # Test the calculate_power_function view
        response = self.client.get(reverse('calculate_power_function'), {'n': 2})
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertIn('x', data)
        self.assertIn('y', data)
        # Add more assertions here to validate the response data

class SurfaceGraphDataViewTests(TestCase):
    
    def setUp(self):
        # Set up the client to make requests
        self.client = Client()

    def test_surface_graph_data_view(self):
        # Test the SurfaceGraphDataView
        response = self.client.get(reverse('surface_graph_data'))
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertIn('x', data)
        self.assertIn('y', data)
        self.assertIn('z', data)
        # Add more assertions here to validate the response data

